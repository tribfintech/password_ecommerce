// material
import { Checkbox, TableRow, TableCell, TableHead } from '@material-ui/core';

// ----------------------------------------------------------------------

type ProductListHeadProps = {
  rowCount: number;
  headLabel: any[];
  numSelected: number;
  onSelectAllClick: (checked: boolean) => void;
};

export default function ProductListHead({
  rowCount,
  headLabel,
  numSelected,
  onSelectAllClick
}: ProductListHeadProps) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onSelectAllClick(event.target.checked)
            }
          />
        </TableCell>
        {headLabel.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.alignRight ? 'right' : 'left'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
