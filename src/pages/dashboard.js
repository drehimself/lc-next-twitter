import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import { View, Text, FlatList } from 'react-native-web'

const Dashboard = () => {
    const [tweets, setTweets] = useState([])

    useEffect(() => {
        fetchTweets()
    }, [])

    function fetchTweets() {
        axios.get('/api/tweets').then(response => {
            setTweets(response.data.data)
        })
    }

    const renderItem = ({ item }) => (
        <View>
            <Text>{item.user.name}</Text>
            <Text>{item.body}</Text>
        </View>
    )

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <FlatList
                                data={tweets}
                                renderItem={renderItem}
                                keyExtractor={item => item.id.toString()}
                            />
                            {/* <ul className="px-10 py-6 space-y-4">
                                {tweets.map(tweet => (
                                    <li key={tweet.id}>
                                        <div>{tweet.user.name}</div>
                                        <div>{tweet.body}</div>
                                    </li>
                                ))}
                            </ul> */}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
