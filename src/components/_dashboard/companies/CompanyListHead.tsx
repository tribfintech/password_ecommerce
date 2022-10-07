// material
import { Checkbox, TableRow, TableCell, TableHead } from '@material-ui/core';

// ----------------------------------------------------------------------

type CompanyListHeadProps = {
  rowCount?: number;
  headLabel: any[];
  numSelected?: number;
  onSelectAllClick?: (checked: boolean) => void;
};

export default function CompanyListHead({
  rowCount,
  headLabel,
  numSelected,
  onSelectAllClick
}: CompanyListHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {rowCount && numSelected && onSelectAllClick ? (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onSelectAllClick(event.target.checked)
              }
            />
          </TableCell>
        ) : null}
        {headLabel.map((subheadCell) => (
          <TableCell key={subheadCell.id} align={subheadCell.alignRight ? 'right' : 'left'}>
            {subheadCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
