import React from 'react';
import styles from './ReviewItem.module.scss';
import axios from 'axios';

const ReviewItem = ({ name, userId, productId, createdAt }) => {

    const [productReviews, setProductReviews] = React.useState([]);
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        if (productId) {
            axios.get(`http://localhost:3001/api/review?productId=${productId}`)
                .then((res) => {
                    setProductReviews(res.data);            
                }); 
        }
    }, [productId]);

    React.useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:3001/api/user?id=${userId}`)
                .then((res) => {
                    setUser(res.data);            
                }); 
        }
    }, [userId]);


    return (
            <div className={styles.item}>
                <div className={styles.top}>
                    <div className={styles.userName}>{user.firstName}</div>
                    <div className={styles.date}>{createdAt.slice(0,19).replace('T', ' / ')}</div>
                </div>
                <div className={styles.body}>
                    <div className={styles.rating}>
                        <svg className={styles.ratingStar} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                        </svg>
                        <span>{name}</span>
                </div>
                {productReviews ? productReviews.map((review) =>
                    <p key={review.id} className={styles.text}>
                        {userId === review.userId ? review.text : ''}
                    </p>)
                    :
                    ''
                }
                </div>
            </div>    
 
    );
};

export default ReviewItem;