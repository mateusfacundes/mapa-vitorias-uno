import React, {useState,useEffect} from 'react'
import {Grid, Paper, Typography } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { fontSize } from '@mui/system';
import Grafico from '../componenets/MainGrafico'

const cardsColors = ['#85c040','#da3e28', '#0a77b8',' #ffd237']

const textStyle = {color: 'white'}
const bntStyle = {color: 'white' , margin: 2}


export default function Home(){
    const [jogadores, setJogadores] = useState([])
    const [colunas, setColunas] = useState([])
    const [dadosVitorias, setDadosVitorias] = useState([])

    const handleAdicionar = async (jogador) =>{
        jogador.qtd_vitorias += 1;
        console.log(jogador)
        const data = await fetch('http://localhost:5000/jogadores/'+jogador.id, {
            method: "PUT",
            headers: { 
             "Content-Type": "application/json"   
            },
            body: JSON.stringify(jogador)
        })
        console.log(data)
        setJogadores((prevState) => prevState.map((jogador) => (jogador.id === data.id ? jogador = data : jogador)))
    }
    
    useEffect(()=>{
        getJogadores();

    }, [])

    useEffect(()=>{
        getJogadores();

    }, [handleAdicionar])

    const getJogadores = async () => {
        const dados = await fetch('http://localhost:5000/jogadores')
        .then((response) => response.json())
        .then((data) => data); 

        setJogadores(dados)
        formataColunasLinhas(dados)
    }

    const formataColunasLinhas = (dados) => {
        let colunas = []
        let linhas = []

        dados.map((dado) => {
            colunas.push(dado.nome)
            linhas.push(dado.qtd_vitorias)

            setColunas(colunas)
            setDadosVitorias(linhas)
        })
    }



    return(
        <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        >
            <Grid item  xs={12}>
                <Paper elevation={3} sx={{margin: '30px auto', padding: '30px'}}>
                    <Typography variant="h3" gutterBottom>
                        Vitorias semanais uno
                    </Typography>
                    <Grafico 
                    colunas={colunas}
                    pontuacao={dadosVitorias}
                    />
                </Paper>
                <Paper elevation={3} sx={{margin: '30px auto', padding: '30px'}}>
                    <Typography variant="h4" gutterBottom>
                        Adicionar pontos
                    </Typography>
                    <Grid container >                    
                        {
                            jogadores.map((jogador) => (
                                <Grid key={jogador.id} item xs={3} sx={{ borderRadius: '5px'}} >
                                    <Grid item >
                                        <Typography variant="h6" gutterBottom>
                                            {jogador.nome}
                                        </Typography>
                                    </Grid>
                                    <Grid 
                                    item sx={bntStyle} 
                                    onClick={() => handleAdicionar(jogador)}
                                    >
                                        <AddIcon 
                                        sx={{backgroundColor: cardsColors[2], borderRadius: '5px'}} 
                                        fontSize={'large'}
                                        
                                        />
                                    </Grid>
                                    
                                </Grid>
                            ))
                        }
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
    
}