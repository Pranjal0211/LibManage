 import { useEffect, useState } from "react";
 import BookModel from "../../models/BookModel";
 import { SpinnerLoading } from "../Utils/SpinnerLoading";
 import { StarsReview } from "../Utils/StarsReview";
 import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
// import { LatestReviews } from "./LatestReviews";

 export const BookCheckoutPage = () => {

     const [book, setBook] = useState<BookModel>();
     const [isLoading, setIsLoading] = useState(true);
     const [httpError, setHttpError] = useState(null);

     const bookId = (window.location.pathname).split('/')[2];

     useEffect(() => {
         const fetchBook = async () => {
             const baseUrl: string = `http://localhost:9090/api/books/${bookId}`;

             //fetching the url data, its asynchrous so we use await, awaited and called our api from springboot
             const response = await fetch(baseUrl);

             //make sure the response is ok
             if (!response.ok) {
                 throw new Error('Something went wrong!');
             }

            //converted the response to json (await is used for asynchronous function)
            const responseJson = await response.json();

            //created new var to push the books data
            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img,
            };

            //set the books to loaded books and loading to false
            setBook(loadedBook);
            setIsLoading(false);
        };

        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book?.img ?
                            <img src={book?.img} width='226' height='349' alt='Book' />
                            :
                            <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                                height='349' alt='Book' />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                            <StarsReview rating={4} size={32} />
                         </div>
                     </div>
                     <CheckoutAndReviewBox book={book} mobile={false} currentLoansCount={0} isAuthenticated={undefined} isCheckedOut={false} checkoutBook={undefined} isReviewLeft={false} submitReview={undefined}/>
                    {/* <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} /> */}
                </div>
                <hr/>
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {book?.img ?
                        <img src={book?.img} width='226' height='349' alt='Book' />
                        :
                        <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                            height='349' alt='Book' />
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarsReview rating={4} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={false} currentLoansCount={0} isAuthenticated={undefined} isCheckedOut={false} checkoutBook={undefined} isReviewLeft={false} submitReview={undefined} />
                <hr />
            </div>
        </div>
    );
}