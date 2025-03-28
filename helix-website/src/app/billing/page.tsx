"use client";

import { BillingPage as FlowgladBillingPage, PricingTable, useBilling } from '@flowglad/nextjs'

export default function BillingPage() {
    const billing = useBilling();
    if (!billing.loaded || !billing.catalog) {
        return <div>Loading...</div>
    } else {
        return <div className='min-h-screen py-16'>
        </div>

    }
}
