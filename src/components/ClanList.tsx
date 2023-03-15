import { useEffect, useState } from 'react'
import styled from 'styled-components';

const ClanWrapper = styled.div`
  background-color: #a6a6a6;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ClanItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
`;

const ClanList = () => {
  const [clanList, setClanList] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetchClanData()
  }, [])

  const fetchClanData = async () => {
    try { 
      const response = await fetch('https://naruto-api.fly.dev/api/v1/clans')
      const data = await response.json();
      console.log('data', data)
      setClanList(data);
      setLoading(false)
    } catch(error) {
      console.log('Error: fetchClanData', error)
      setLoading(false)
    }
  }

  return (
    <ClanWrapper>
      {isLoading && <h4>Loading Clan name...</h4>}
      {clanList.slice(0,20).map((item: any) => (
        <ClanItem key={item.id}>
          <h4 style={{ margin: 0, marginTop: 10 }}>{item.name}</h4>
        </ClanItem>
      ))}
      <img src="https://discovery-app.vercel.app/itachi.jpeg" style={{ width: '300px' }} />
    </ClanWrapper>
  )
}

export default ClanList;
