import React, { useEffect } from 'react'
import { fetchChannelList } from '../store/channel'
import { useDispatch, useSelector } from 'react-redux'

export default function Channel() {

    const channel = useSelector((state) => state.channel.channelList)
    console.log(channel);
    const dispatch = useDispatch()

    // componnetDidMount
    useEffect(() => {
        dispatch(fetchChannelList())
        // fetchChannelList()()
    }, [])

    return (
        <div>
            <h2>Channel</h2>
            <ul>
                {
                    channel.map(item=>{
                        return <li key={item.id}>
                            {item.name}
                        </li>
                    })
                }
            </ul>
        </div>
    )
}
