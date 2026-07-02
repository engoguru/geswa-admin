import React, { useEffect,useState   } from 'react'
import MainLayout from '../../layout/MainLayout'
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { viewAllContact } from '../../../redux/slice/contactSlice'
import { Link } from 'react-router-dom'

function ContactMain() {
    const dispatch = useDispatch()

    const { contacts } = useSelector((state) => state.contact);
    const [search, setSearch] = useState("")

    useEffect(() => {
        const Timer = setTimeout(() => {
            dispatch(viewAllContact({search}))
        }, 400)
        return () => { clearTimeout(Timer) }
    }, [search])
    // console.log(contacts, ";kpotyt")
    return (
        <>
            <MainLayout>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}

                />


                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                contacts?.map((item) => (
                                    <TableRow key={item}>

                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.contact}</TableCell>
                                        <TableCell>{item.subject}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" size="small" component={Link} to={`/contact/${item.id}`}>
                                                View
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>


            </MainLayout>
        </>
    )
}

export default ContactMain