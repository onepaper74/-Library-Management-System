import {useEffect,useState} from 'react';
import BookModel from '../../models/BookModel';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { SearchBook } from './components/SearchBook';
import { Pagination } from '../Utils/Pagination';

export const SearchBooksPage = () => {
    const [books,setBooks] = useState<BookModel[]>([]);
    const [isLoading,setIsLoading] = useState(true);
    const [httpError,setHttpError] = useState(null);
    const [currentPage,setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalAmountOfBooks,setTotalAmountOfBooks] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    const [search,setSearch] = useState('');
    const [searchUrl,setSearchUrl] = useState('');
    const [categorySelection,setCategorySelection] = useState('Book category');

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8080/api/books";

            // const url: string = `${baseUrl}?page=0&size=5`;
            let url: string = '';
            // const url: string = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;

            if(searchUrl === ''){
                url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
            }else{
                let searchWithPage = searchUrl.replace('<pageNumber>',`${currentPage - 1}`);
                url = baseUrl + searchWithPage;
            }
            const response = await fetch(url);

            if(!response.ok){
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.books;

            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedBooks: BookModel[] = [];

            for(const key in responseData){
                loadedBooks.push({
                    id:responseData[key].id,
                    title:responseData[key].title,
                    author:responseData[key].author,
                    description:responseData[key].description,
                    copies:responseData[key].copies,
                    copiesAvailable:responseData[key].copiesAvailable,
                    category:responseData[key].category,
                    img:responseData[key].img
                });
            }

            setBooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error:any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0,0);
    },[currentPage,searchUrl]);

    if(isLoading){
        return (
            <SpinnerLoading/>
        )
    }

    if(httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    const searchHandleChange = () => {
        setCurrentPage(1);
        if(search === ''){
            setSearchUrl('');
        }else{
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`);
        }
        setCategorySelection('Book category')
    }

    const categoryField = (value:string) => {
        setCurrentPage(1);
        if(
            value.toLowerCase() === 'fic' ||
            value.toLowerCase() === 'nf' ||
            value.toLowerCase() === 'dr' 
        ) {
            setCategorySelection(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`)
        } else {
            setCategorySelection('All');
            setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)
        }
    }


    const indexOfLastBook:number = currentPage * booksPerPage;
    const indexOfFirstBook:number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? 
        booksPerPage * currentPage :totalAmountOfBooks;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='search'
                                    placeholder='Search' aria-labelledby='Search'
                                    onChange={e => setSearch(e.target.value)}/>
                                <button className='btn btn-outline-success'
                                    onClick={() => searchHandleChange()}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton' data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    {categorySelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                                    <li onClick={() => categoryField('ALL')}>
                                        <a className='dropdown-item' href='#'>
                                            ALL
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('FIC')}>
                                        <a className='dropdown-item' href='#'>
                                            Fiction
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('NF')}>
                                        <a className='dropdown-item' href='#'>
                                            Non-Fiction
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('DR')}>
                                        <a className='dropdown-item' href='#'>
                                            Drama
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfBooks > 0 ?
                    <>
                    <div className='mt-3'>
                        <h5>Number of results:({totalAmountOfBooks})</h5>
                    </div>
                    <p>
                        {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:
                    </p>
                    {books.map(book => (
                        <SearchBook book={book} key={book.id}/>
                    ))}
                    </>
                    :
                    <div className='m-5'>
                        <h1>
                            Can't find what you are looking for?
                        </h1>
                        <a type='button' className='btn main-color btn-md px-4 me-md-2 fw-bold text-white'
                            href='#'>Library Services</a>
                    </div>
                    }
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
                </div>
            </div>
        </div>
    )
}