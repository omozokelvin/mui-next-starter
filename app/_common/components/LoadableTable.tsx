import { LoadingImage } from '@/app/_common/components/LoadingImage';
import {
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Theme,
  Typography,
} from '@mui/material';
import {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from 'react';

interface LoadableTableProps {
  isLoading: boolean;
  noData: boolean;
  header: ReactElement;
  noDataText?: string;
  footer?: ReactElement;
  sx?: SxProps<Theme>;
  children: ReactNode;
}

export const LoadableTable = ({
  isLoading,
  children,
  header,
  footer,
  noData,
  noDataText = 'No Data found',
  sx,
}: LoadableTableProps) => {
  const childrenRef = useRef<HTMLTableSectionElement[]>([]);
  const [columnCount, setColumnCount] = useState(0);

  useEffect(() => {
    const count = childrenRef.current[0]?.querySelectorAll('th').length;
    setColumnCount(count || 0);
  }, []);

  return (
    <>
      <TableContainer sx={sx}>
        <Table>
          {Children.map(header, (child, index) =>
            cloneElement(child as ReactElement, {
              ref: (ref: HTMLTableSectionElement) =>
                (childrenRef.current[index] = ref),
            })
          )}

          {isLoading && (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={columnCount}
                  sx={{
                    textAlign: 'center',
                    py: 10,
                  }}
                >
                  <LoadingImage />
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          {!isLoading && children}

          {!isLoading && noData && (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={columnCount}
                  sx={{
                    textAlign: 'center',
                    py: 5,
                  }}
                >
                  <Typography variant="subtitle2" align="center">
                    {noDataText}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {footer && footer}
    </>
  );
};
