/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async tourId => {
  try {
    const stripe = Stripe(
      'pk_test_51KULYtEijdBsvZ9QrHHw5hBWBFTWonFOLwZ9IwK7h10vIvtXxiHLeXoREztOiHomzXUGum0jgBhJL2GA6MpoVIfa008bJD1OEu'
    );
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Creat checkout from + chance credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
