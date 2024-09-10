import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOder } from '~/untils/sort'
import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable';
import Card from './ListColumns/Column/ListCards/Card/Card'
import Column from './ListColumns/Column/Column'
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
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragStart = (event) =>{
    setActiveDragItemData(event.active.data.current)
  }
  const handleDragEnd = (event) => {
    const { active, over } = event
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
    }
  }
  const dropAnimation  = {
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
      sensors={sensors}
      onDragStart={handleDragStart}
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
