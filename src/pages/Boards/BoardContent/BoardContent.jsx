import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOder } from '~/untils/sort'
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects, closestCorners } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable';
import Card from './ListColumns/Column/ListCards/Card/Card'
import Column from './ListColumns/Column/Column'
import { cloneDeep } from 'lodash'
const BoardContent = ({ board }) => {
  //https://docs.dndkit.com/api-documentation/sensors
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint:{ distance:10 } })

  // yêu cầu chuột di chuyển 10px mới bắt sự kiện
  const mouseSensor = useSensor(MouseSensor, { activationConstraint:{ distance:10 } })

  //nhấn giữ 250s và dung sai cảm ứng khoản 5px mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint:{ delay:250, tolerance:5 } })

  //ưu tiên dùng kết hợp 2 loại mouse and touch để có trải nghiệm tốt nhất trên mobile
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // tìm một cái column theo cardId
  const findColumnByCardId = (cardId) => {
    // phải dùng card k dùng cardIds
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemData(event.active.data.current)
  }

  // trigger trong quá trình kéo 1 phần tử
  const handleDragOver = ( event ) => {
    // không làm gì nếu kéo column
    if (activeDragItemData?.columnId ===undefined) return

    // xử lí khi kéo thả card
    // console.log('handledragover', event);
    const { active, over }= event
    if (!over || !active) return

    //activeDraggingCardId là card đang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } }= active
    //overcard là card đang tương tác với card ở trên
    const { id: overCardId } = over

    // tìm 2 cái column theo cardId
    const activeColumn= findColumnByCardId(activeDraggingCardId)
    const overColumn= findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    // nếu 2 column khác nhau và có card
    if (activeColumn._id!== overColumn._id) {
      // cập nhật lại state columns sau khi đã kéo thả
      setOrderedColumns(prev => {
        //tìm vị trí của overCard trong column đích( noi card được thả)
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
        //logic xử lí để tính toán 'cardIndex mới
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0;
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        const nextColumns = cloneDeep(prev)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        if (nextActiveColumn) {
          //
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
          // cập nhật lại dữ liệu mảng cardOrderIds cho chuẩn
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }
        if (nextOverColumn) {
          //kiểm tra xem card đang kéo nó có tồn tại ở overColumn không nếu có thì xóa đi trước
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
          // thêm card đang kéo vào
          nextOverColumn.cards= nextOverColumn?.cards?.toSpliced(newCardIndex, 0, activeDraggingCardData)
          // cập nhật lại dữ liệu mảng cardOrderIds cho chuẩn
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }
        return nextColumns
      })
    }

  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (activeDragItemData?.columnId !==undefined) return

    if ( !over ) return
    //nếu vị trí sau khi kéo thả khác vị trí ban đầu
    if (active.id !== over?.id) {
      const oldIndex=orderedColumns.findIndex(c => c._id === active.id) // laays vi tri cu
      const newIndex=orderedColumns.findIndex(c => c._id === over.id) // laays vi tri moi
      //dung arraymove để sắp xếp dữ liệu sau khi drag
      const dndOrderedColumns= arrayMove(orderedColumns, oldIndex, newIndex);

      //sau nay xu ly api
      // const dndOrderedColumnsIds= dndOrderedColumns.map(c => c._id)
      // console.log(dndOrderedColumnsIds);

      // cập nhật lại state columns sau khi đã kéo thả
      setOrderedColumns(dndOrderedColumns)
      setActiveDragItemData(null)
      setActiveDragItemId(null)
    }
  }
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };
  return (
    <DndContext
      // cảm biến
      sensors={sensors}
      // thuật toán phát hiện va chạm (nếu không có nó thì card với cover lớn sẽ không kéo qua column được vì lúc này nó đang bị conflict giữa card and column), chúng ta sẽ dùng closestConners
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={ {
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width:'100%',
        height:(theme) => theme.trello.boardContentHeight,
        p:'10px 0',
      } }>
        <ListColumns columns={orderedColumns}/>
        <DragOverlay dropAnimation={dropAnimation}>
          {!!activeDragItemData?.columnId && null}
          {activeDragItemData?.columnId ===undefined ? <Column column={activeDragItemData}/> : <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
