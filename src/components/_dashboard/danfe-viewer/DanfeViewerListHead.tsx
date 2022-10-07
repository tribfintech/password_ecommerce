// material
import { Checkbox, TableRow, TableCell, TableHead } from '@material-ui/core';

type DanfeViewerListHeadProps = {
  rowCount: number;
  headLabel: any[];
  numSelected: number;
  onSelectAllClick: (checked: boolean) => void;
};

export default function DanfeViewerListHead({
  rowCount,
  headLabel,
  numSelected,
  onSelectAllClick
}: DanfeViewerListHeadProps) {
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
