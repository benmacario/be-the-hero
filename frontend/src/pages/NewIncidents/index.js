import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"

import api from "../../services/api"

import "./style.css"
import logoImg from "../../assets/logo.svg"

export default function NewIncidents() {
    const [title, setTitle] = useState("")
    const [description, setDesc] = useState("")
    const [value, setValue] = useState("")

    const ong_id = localStorage.getItem("ong_id")

    const history = useHistory()

    async function handleNewIncidents(e) {
        e.preventDefault()

        const data = {
            title,
            description,
            value,
        }

        try {
            await api.post("incidents", data, {
                headers: {
                    Authorization: ong_id,
                }
            })

            history.push("/profile")
        } catch (err) {
            alert("Erro ao cadastrar caso, tente novamente!")
        }
    }


    return (
        <div className="new-incidents-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={ handleNewIncidents }>

                    <input placeholder="Título do caso" value={ title } onChange={e => setTitle(e.target.value)}/>
                    <textarea placeholder ="Descrição" value={ description } onChange={e => setDesc(e.target.value)}/>
                    <input placeholder="Valor em reais" value={ value } onChange={e => setValue(e.target.value)}/>

                    <button type="submit" className="button">Cadastrar</button>

                </form>
            </div>

        </div>
    )
}