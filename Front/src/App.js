import './App.css';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import BannerComponent from './components/bannerComponent';
import Button from '@mui/material/Button';
import TableComponent from './components/tableComponent';
import ModalComponent from './components/modalComponent';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { getAll, postOne, deleteOne } from './middleware/requests';

const App = () => {
  const [filter, setFilter] = useState({ word: '', originalData: [] })
  const [data, setData] = useState([])
  const [count, setCount] = useState(1)
  const [open, setOpen] = useState(false)

  const updateData = (loadData) => {
    if (loadData?.data?.length !== 0) {
      const newData = loadData.data.map(e => {
        return { id: e.id, title: e.title, description: e.description, status: e.status, date: e.date, remove: () => removeTask(e.id) }
      })
      setData(newData)
      const lastCount = parseInt(newData[newData.length - 1].id)
      setCount(lastCount + 1)
    }
  }

  const removeTask = async (id) => {
    await deleteOne({ id })
    await getAll().then((loadData) => updateData(loadData))
  }

  const createNewTask = async (
    {
      title,
      description,
      status,
      date
    }) => {

    await postOne({
      id: count,
      title,
      description,
      status,
      date
    })
    await getAll().then((loadData) => updateData(loadData))

  }

  const filterTasks = () => {
    setFilter({ ...filter, originalData: data })
    const newData = data.filter(e => {
      const re = new RegExp(filter.word, 'gi');
      const titleMatches = e.title.match(re)
      const statusMatches = e.status.match(re)
      if (titleMatches !== null || statusMatches !== null) {
        return true
      } else {
        return false
      }
    })
    setData(newData)
  }

  const resetFilter = () => {
    setData(filter.originalData)
    setFilter({ word: '', originalData: [] })
  }

  useEffect(() => {
    getAll().then((loadData) => { updateData(loadData) })
  })

  return (
    <>
      <div className="">
        <BannerComponent title={"Todo APP"} subTitle={"Angela Pinelo"} />
      </div>
      <div className="">

        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs: 0, sm: 5 },
            pb: { xs: 8, sm: 2 },
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <TextField id="word" label="Filter" variant="filled" value={filter.word} onChange={(e) => setFilter({ ...filter, [e.target.id]: e.target.value })} />
            {
              filter.originalData.length === 0 ?
                <Button variant="contained" disableElevation onClick={() => filterTasks()}>
                  Filtrar
                </Button> :
                <Button variant="contained" disableElevation onClick={() => resetFilter()}>
                  Reset Filtro
                </Button>
            }

            <Button variant="contained" disableElevation onClick={() => {
              setOpen(true)
              console.log(data)
            }}>
              Agregar Tarea
            </Button>
          </Stack>
        </Container>
      </div>
      <div className='tablePage'>
        <TableComponent data={data} />
      </div>
      <div>
        <ModalComponent open={open} setOpen={setOpen} count={count} setCount={setCount} createNewTask={createNewTask} />
      </div>
    </>
  );
}

export default App;
