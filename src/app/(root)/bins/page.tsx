import BinSearchForm from '@/app/(root)/_components/BinSearchForm';
import { getBins } from '@/app/actions/bin.actions';
import BinList from '@/app/components/BinList';
import BinSkeleton from '@/app/components/BinSkeleton';
import PageBase from '@/app/components/PageBase';
import { SearchParams } from 'nuqs';
import React, { Suspense } from 'react'

type PageProps = {
    searchParams: Promise<SearchParams>
  }

export default async function page({ searchParams }: PageProps) {

    const params = await searchParams;
    const binResponsePromise = getBins(params)

    return (
        <PageBase
            title="Browse Bins"
            description='Check what the community is sharing'
            className='pt-16 pb-16'
        >
            <BinSearchForm />
            <Suspense fallback={<BinSkeleton />}>
                <BinList binResponsePromise={binResponsePromise} />
            </Suspense>
        </PageBase>
    );
}
