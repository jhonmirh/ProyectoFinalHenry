import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';

interface CreateCheckoutSessionBody {
  amount: number;
  currency: string;
  description: string;
}

interface ErrorResponse {
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Método no permitido' });
    return;
  }

  const { amount, currency, description } = req.body as CreateCheckoutSessionBody;

  try {

    

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payments/checkout`, {
      amount,
      currency,
      description,
    });

    if (!response.data.url) {
      throw new Error('Error en la respuesta del backend');
    }

    res.status(200).json({ url: response.data.url });
  } catch (error) {

    
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error('Error en el API de Next.js:', axiosError.message);
    res.status(500).json({ message: axiosError.response?.data.message || 'Error interno del servidor' });
  }
}
