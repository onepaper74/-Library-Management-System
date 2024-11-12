import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const Heros = () => {
    
    const { authState } = useOktaAuth();

    return (
        <div>
            <div className='d-none d-lg-block'>
                <div className='row g-0 mt-5'>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>What have you been reading?</h1>
                            <p className='lead'>
                            Whether you are diving into the latest bestsellers, 
                            exploring timeless classics, or discovering hidden gems, 
                            our library offers something for everyone. 
                            </p>
                            {authState?.isAuthenticated ?
                                <Link type='button' className='btn main-color btn-lg text-white'
                                    to='search'>Explore all the books</Link>
                                :
                                <Link className='btn main-color btn-lg text-white' to='/login'>Sign up</Link>
                            }  
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-right'></div>
                    </div>
                </div>
                <div className='row g-0'>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-left'></div>
                    </div>
                    <div className='col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                            From thrilling mysteries to thought-provoking non-fiction, 
                            there is no limit to the adventures you can embark on through the pages of a book.
                            Let us help you find your next great read!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Heros */}
            <div className='d-lg-none'>
                <div className='container'>
                    <div className='m-2'>
                        <div className='col-image-right'></div>
                        <div className='mt-2'>
                            <h1>What have you been reading?</h1>
                            <p className='lead'>
                            Whether you are diving into the latest bestsellers, 
                            exploring timeless classics, or discovering hidden gems, 
                            our library offers something for everyone. 
                            </p>
                            {authState?.isAuthenticated ?
                                <Link type='button' className='btn main-color btn-lg text-white'
                                    to='search'>Explore all the books</Link>
                                :
                                <Link className='btn main-color btn-lg text-white' to='/login'>Sign up</Link>
                            }
                        </div>
                    </div>
                    <div className='m-2'>
                        <div className='col-image-left'></div>
                        <div className='mt-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                            From thrilling mysteries to thought-provoking non-fiction, 
                            there is no limit to the adventures you can embark on through the pages of a book.
                            Let us help you find your next great read!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}