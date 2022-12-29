import ClassList from '../components/ClassListV2'

export default function ClassPage({ allClass = false }: { allClass?: boolean }) {
  return (
    <>
      <ClassList allClass={allClass} />
    </>
  )
}
