import DetailLesson from './DetailLesson'

export default function ListLesson(props) {
  let { data, isInThisClass } = props
  return (
    <>
      {isInThisClass ? (
        <div className="listLesson w-full">
          {data &&
            data.map((item) => {
              return (
                <>
                  <br></br>
                  <DetailLesson key={item?.id} data={item} />
                </>
              )
            })}
        </div>
      ) : (
        <h4 className="text-red-500">Bạn phải đăng kí học phần mới có thể xem nội dung môn học này!</h4>
      )}
    </>
  )
}
