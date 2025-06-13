import { PasswordModal } from '@/app/(root)/bins/[binId]/_components/PasswordModal'
import { getBin } from '@/app/actions/bin.actions'
import { CompleteBin } from '@/zod/prisma'
import { notFound } from 'next/navigation'
import React from 'react'

interface PageProps{
    binId: CompleteBin["binId"]
}



export default async function page({binId}:PageProps) {

    const bin = await getBin({binId});
    if(!bin) return notFound();

  return (
    <PasswordModal/>
  )
}
