import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import AttachmentIcon from '@mui/icons-material/Attachment';
import CommentIcon from '@mui/icons-material/Comment';
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
function Card({ temporaryHideMedia }) {
  if ( temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
        overflow:'unset'
      }}>
        <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>Quindev - test1</Typography>
        </CardContent>
        <CardActions sx={{ p:'0px 4px 8px 4px' }}>
          <Button size="small" startIcon={<GroupIcon/>}>20</Button>
          <Button size="small" startIcon={<CommentIcon/>}>50</Button>
          <Button size="small" startIcon={<AttachmentIcon/>}>2</Button>
        </CardActions>
      </MuiCard>
    )
  }
  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
      overflow:'unset'
    }}>
      <CardMedia
        sx={{ height: 140, objectFit: 'contain' }}
        image="https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-dai-dien-facebook-dep-cho-nam-30-28-16-26-50.jpg"
        title="green iguana"
      />
      <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>Quindev - fullstack developer</Typography>
      </CardContent>
      <CardActions sx={{ p:'0px 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon/>}>20</Button>
        <Button size="small" startIcon={<CommentIcon/>}>50</Button>
        <Button size="small" startIcon={<AttachmentIcon/>}>2</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
