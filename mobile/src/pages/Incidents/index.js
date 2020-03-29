import React, { useState, useEffect } from 'react'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import api from '../../services/api'

import logoImg from '../../assets/logo.png'
import style from './style'

export default function Incidents() {
    const [incidents, setIncidents] = useState([])
    const navigation = useNavigation()

    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)



    function navigationToDetail(incident) {
        navigation.navigate('Detail', { incident })
    }

    async function loadIncidents() {
        if(loading) {
            return
        }

        if(total > 0 && incidents.length === total) {
            return
        }

        setLoading(true)

        const response = await api.get('/incidents', { params: { page } })
        setIncidents([...incidents, ...response.data])

        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    },[])

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg}/>
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>
            
            <Text style={style.title}>Bem-vindo!</Text>
            <Text style={style.description}>Escolha um dos caso abaixo, e salve o dia.</Text>
            
            <FlatList
                data={incidents}
                style={style.incidentsList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}

                renderItem={({ item: incident }) => (
                    <View style={style.incidents}>
                        <Text style={style.incidentsProperty}>ONG:</Text>
                        <Text style={style.incidentsValue}>{ incident.name }</Text>

                        <Text style={style.incidentsProperty}>CASO:</Text>
                        <Text style={style.incidentsValue}>{ incident.title }</Text>

                        <Text style={style.incidentsProperty}>VALOR</Text>
                        <Text style={style.incidentsValue}>{ Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value) }</Text>

                        <TouchableOpacity style={style.detailsButton} onPress={ () => navigationToDetail(incident) }>
                            <Text style={style.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                        </TouchableOpacity>

                    </View>

                )}

            />
        </View>
    )
}