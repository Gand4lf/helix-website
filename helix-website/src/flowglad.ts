import { FlowgladServer } from '@flowglad/nextjs/server'
import { cookies, headers } from 'next/headers'

export const flowgladServer = new FlowgladServer({
    getRequestingCustomer: async () => {
        try {
            console.log("FlowGlad getRequestingCustomer");
            const cookieStore = await headers()
            const flowgladCustomerId = cookieStore.get('x-flowglad-customer-id')
            const flowgladCustomerEmail = cookieStore.get('x-flowglad-customer-email')
            const flowgladCustomerName = cookieStore.get('x-flowglad-customer-name')
            console.log("FlowGlad Customer ID:", flowgladCustomerId);
            console.log("FlowGlad Customer Email:", flowgladCustomerEmail);
            console.log("FlowGlad Customer Name:", flowgladCustomerName);
            if (!flowgladCustomerId) {
                throw new Error('Flowglad customer ID not found')
            }
            return {
                externalId: flowgladCustomerId,
                email: flowgladCustomerEmail || '',
                name: flowgladCustomerName || '',
            }
        } catch (error) {
            console.error("FlowGlad error:", error);
            throw error;
        }
    }
})
  
  
  
  
  
  
  