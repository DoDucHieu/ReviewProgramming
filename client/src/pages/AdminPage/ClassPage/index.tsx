import { useEffect, useMemo, useState } from 'react'

// MUI COMPONENTS
import {
  Button,
  Stack,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  TableSortLabel,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

// MUI ICONS
import { Loop, EditOutlined, HighlightOffOutlined } from '@mui/icons-material'

// REACT-TABLE
import { useTable, useSortBy } from 'react-table'

// FAKE DATA
import { CLASS_DATA } from 'src/fakeData/class'

// TYPES
import { ClassType } from 'src/types'

// CONSTANTS
import { COLUMNS, FORM_CREATE_LABEL } from './const'

// MODALS
import ModalCreate from './components/ModalCreate'
import ModalUpdate from './components/ModalUpdate'

// REACT-QUERY-HOOKS
import useClassQuery from 'src/hooks/reactQueryHooks/useClassQuery'

import useClassMutation from 'src/hooks/reactQueryHooks/useClassMutation'

export default function ClassPage() {
  // ==================STATES==================
  // pagination
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(25)

  // modals
  const [openModalCreate, setOpenModalCreate] = useState(false)
  const [openModalUpdate, setOpenModalUpdate] = useState(false)

  const [showDialog, setShowDialog] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [deleteId, setDeleteId] = useState()

  const [detailId, setDetailId] = useState('')

  // ============ DATA ============
  // react-query
  const { data: queryData } = useClassQuery.getById(detailId)
  const { data: queriesData, isFetching, refetch } = useClassQuery.getAll({ limit, page: page + 1 })

  const { mutate: deleteById } = useClassMutation.delete()

  // react-table
  const columns: any = useMemo(() => COLUMNS, [COLUMNS])
  const data: ClassType[] = useMemo(() => queriesData?.data || [], [queriesData?.data])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy)

  // ============ EFFECT ============
  useEffect(() => {
    if (isDelete && deleteId) {
      deleteById(deleteId)
    }

    return () => {
      setIsDelete(false)
      setDeleteId('')
    }
  }, [isDelete])

  // ============ HANDLE FUNCTIONS ============

  return (
    <Paper>
      {/* BUTTONS HEADER */}
      <Stack sx={{ m: 2 }} direction="row" spacing={2}>
        <Box>
          <Button onClick={() => setOpenModalCreate(true)} variant="outlined">
            {FORM_CREATE_LABEL}
          </Button>
        </Box>

        <Box>
          <LoadingButton
            onClick={() => refetch()}
            loading={isFetching}
            loadingPosition="start"
            startIcon={<Loop />}
            variant="outlined"
          >
            Tải lại
          </LoadingButton>
        </Box>
      </Stack>

      <TableContainer sx={{ maxHeight: 'calc(100vh - 360px)' }}>
        <Table {...getTableProps()} stickyHeader sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => {
                  return (
                    <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                      <TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? 'desc' : 'asc'}>
                        {column.render('Header')}
                      </TableSortLabel>
                    </TableCell>
                  )
                })}

                <TableCell>Hành động</TableCell>
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)

              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                  ))}

                  <TableCell align="left" sx={{ width: '140px' }}>
                    <Stack direction="row">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setShowDialog(true)
                          setDeleteId(row.original.class_id)
                        }}
                      >
                        <HighlightOffOutlined />
                      </IconButton>

                      <IconButton
                        color="success"
                        onClick={() => {
                          setOpenModalUpdate(true)
                          setDetailId(row.original.class_id)
                        }}
                      >
                        <EditOutlined />
                      </IconButton>

                      {/* <IconButton color="info">
                      <InfoOutlinedIcon />
                    </IconButton> */}
                    </Stack>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={queriesData?.meta?.total || 0}
        page={page}
        rowsPerPage={limit}
        onPageChange={(_e: unknown, page: number) => setPage(page)}
        onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setLimit(+event.target.value || 10)
          setPage(0)
        }}
      />

      {/* MODALS */}
      <ModalCreate open={openModalCreate} handleClose={() => setOpenModalCreate(false)} />

      <ModalUpdate
        open={openModalUpdate}
        initData={queryData?.data || null}
        handleClose={() => setOpenModalUpdate(false)}
      />

      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Bạn có chắc muốn xóa?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)} autoFocus>
            Hủy
          </Button>
          <Button
            onClick={() => {
              setIsDelete(true)
              setShowDialog(false)
            }}
            color="error"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}
