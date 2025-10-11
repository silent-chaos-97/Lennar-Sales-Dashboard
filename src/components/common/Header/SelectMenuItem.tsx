import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import { SubRegion } from '@/types/cohort'

interface SelectMenuItemProps {
  item: SubRegion
  onSelectMenu: (menu: SubRegion) => void
}

const SelectMenuItem = ({ item, onSelectMenu }: SelectMenuItemProps) => {
  const hasSubItems = item?.divisions && !!item.divisions?.length
  return (
    <>
      <ListItem sx={{ p: 0, pl: hasSubItems ? 0 : 3 }}>
        {hasSubItems && (
          <IconButton sx={{ p: 0 }}>
            <ListItemIcon sx={{ color: 'grey.300', minWidth: 'auto' }} />
          </IconButton>
        )}
