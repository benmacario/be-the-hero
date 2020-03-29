import React from 'react'
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import style from './style'
import logoImg from '../../assets/logo.png'
import { Feather } from '@expo/vector-icons'

export default function Detail() {
    const route = useRoute()
    const navigation = useNavigation()
    
    const incident = route.params.incident
    const message = `Ola ${incident.name}, estou entrando em contato, sobre o caso "${incident.title}", com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}.`

    function navigationBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Hero do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatapp() {
        Linking.openURL(`whatsapp://send?phone=seunumero?text=${message}`)
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg}/>
                
                <TouchableOpacity onPress={ navigationBack }>
                    <Feather name="arrow-left" size={28} color="#E82041"/>
                </TouchableOpacity>
            </View>

            <View style={style.incidentsList}>
                <View style={style.incidents}>
                    <Text style={[style.incidentsProperty, { marginTop: 0} ]}>ONG:</Text>
                    <Text style={style.incidentsValue}>{ incident.name } de { incident.city }/{ incident.uf }</Text>

                    <Text style={style.incidentsProperty}>DESCRIÇÃO:</Text>
                    <Text style={style.incidentsValue}>{ incident.description}</Text>

                    <Text style={style.incidentsProperty}>VALOR</Text>
                    <Text style={style.incidentsValue}>{ Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value) }</Text>

                </View>
            </View>

            <View style={style.contactBox}>
                <Text style={style.heroTitle}>Salve o dia!</Text>
                <Text style={style.heroTitle}>Seja heroi desse caso.</Text>
                
                <Text style={style.heroDescription}>Entre em contato:</Text>
                
                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={ sendWhatapp }>
                        <Text style={style.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.action} onPress={ sendMail }>
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}