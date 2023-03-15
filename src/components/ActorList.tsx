import React from 'react'
import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

const ActorListWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ActorList />
    </QueryClientProvider>
  )
}

const ActorList = () => {
  const fetchActorList = () => {
    return axios.get('https://indodax.com/api/pairs').then(res => res.data)
  }

  const { isLoading, error, data } = useQuery('repoData', fetchActorList)

  if(isLoading) {
    return <span>Loading Data...</span>
  }

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
      {data.slice(0, 10).map((item: any) => {
        return (
          <div key={item.symbol} style={{ border: '1px solid teal', padding: '5px 10px', borderRadius: 5, marginBottom: 10, width: '200px' }}>
            <img src={item.url_logo} width={40} height={40} />
            <h3>{item.symbol}</h3>
            <p>{item.cmc_id}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ActorListWrapper;
