import {
  Checkbox,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

const HEADERS = ['Buổi', 'Tiết', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']

const TableStyled = styled(Table)(() => ({
  borderRadius: '8px',
  '& td, & th': {
    border: '2px solid black',
  },
}))

type RegisterScheduleProps = {
  schedules: number[][]
  handleCheckSchedule: (isChecked: boolean, lesson: number, day: number) => void
}

export default function RegisterSchedule({ schedules, handleCheckSchedule }: RegisterScheduleProps) {
  return (
    <TableContainer>
      <Typography variant="h6" gutterBottom>
        Đăng ký lịch dạy
      </Typography>

      <TableStyled padding="none">
        <TableHead>
          <TableRow>
            {HEADERS.map((header) => (
              <TableCell align="center">{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {schedules.map((_, lessonIndex) => (
            <TableRow key={lessonIndex}>
              {lessonIndex === 0 && (
                <TableCell variant="head" align="center" rowSpan={6}>
                  Sáng
                </TableCell>
              )}
              {lessonIndex === 6 && (
                <TableCell variant="head" align="center" rowSpan={6}>
                  Chiều
                </TableCell>
              )}
              {lessonIndex === 12 && (
                <TableCell variant="head" align="center" rowSpan={4}>
                  Tối
                </TableCell>
              )}
              <TableCell variant="head" align="center">
                {lessonIndex + 1}
              </TableCell>
              {schedules[lessonIndex].map((_, dayIndex) => (
                <TableCell align="center">
                  <Checkbox
                    disabled={schedules[lessonIndex][dayIndex] === 2}
                    checked={schedules[lessonIndex][dayIndex] === 1 || schedules[lessonIndex][dayIndex] === 2}
                    onChange={(event) => handleCheckSchedule(event.target.checked, lessonIndex, dayIndex)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableStyled>
    </TableContainer>
  )
}
