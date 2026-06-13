from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
import stripe
from app.config import settings

router = APIRouter(prefix="/api/payments", tags=["Payments"])

stripe.api_key = settings.STRIPE_SECRET_KEY

class CheckoutSessionRequest(BaseModel):
    tracking_id: str
    amount: int  # Amount in cents
    description: str

@router.post("/create-checkout-session")
def create_checkout_session(body: CheckoutSessionRequest):
    if not settings.STRIPE_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Stripe is not configured.")

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'gbp',
                    'product_data': {
                        'name': f'Repair Ticket: {body.tracking_id}',
                        'description': body.description,
                    },
                    'unit_amount': body.amount,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=f"http://localhost:5173/profile?payment=success&tracking_id={body.tracking_id}",
            cancel_url=f"http://localhost:5173/profile?payment=cancelled",
            metadata={
                "tracking_id": body.tracking_id
            }
        )
        return {"url": session.url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
