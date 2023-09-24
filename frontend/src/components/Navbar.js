
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { ethers } from "ethers";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { VoteProposal } from './VoteBox';
import { ExecuteProposal } from './ExecuteBox';
import { useGetTotalVoters } from '../web3/GetVotersCount';
import { useGetProposals } from '../web3/GetProposalCount';
import daocare_animation from '../img/daocare_animation.gif';
import nouns_nft1 from '../img/792_nft.svg';
import nouns_nft2 from '../img/839_nft.svg';
import nouns_nft3 from '../img/850_nft.svg';

// import { UnlockProtocol } from './UnlockPayWall.js'



export const Navbar = ({ boxValue, getValue, userBalance, getBalance, signer, requestFunds, createProposal, proposal, newValue, proposalDescription }) => {


    const [activeTab, setActiveTab] = useState(0);
    const [shortId, setShortId] = useState();
    const [propDesc, setPropDesc] = useState();
    const [propValue, setPropValue] = useState();

    const { voters, getVoters } = useGetTotalVoters();
    const { proposalCount, getProposalCount } = useGetProposals();

    const [params, setParams] = useState({
        proposalDescription: localStorage.getItem('proposalDescription') || '',
        proposalAmount: localStorage.getItem('proposalAmount') || 0,
    });


    const requestAndUpdateBalance = async () => {
        await requestFunds(signer);
        await getBalance(signer["_address"])
    }

    useEffect(() => { getValue() }, [boxValue])
    useEffect(() => { setShortId(proposal ? proposal.slice(0, 11) + "..." : "0") }, [proposal])
    useEffect(() => { getVoters() }, [])
    useEffect(() => { getProposalCount() }, [])
    useEffect(() => {
        if (signer) {
            getBalance(signer["_address"])
        }
    }, [signer])



    const handleParamsChange = (e) => {
        setParams({ ...params, [e.target.name]: e.target.value })
    }

    const updateParams = () => {
        setPropDesc(proposalDescription ? proposalDescription : localStorage.getItem('proposalDescription'));
        setPropValue(newValue ? newValue : localStorage.getItem('proposalAmount'));
    }



    return (
        <>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <div className='presentation-container'>
                <Typography sx={{ fontFamily: 'Mooli', flexGrow: 1, marginLeft: 50 }}>
                    <img src={daocare_animation} alt="loading..." width='150' heigh='150' align="center" />
                </Typography>
                {/* <Typography sx={{fontFamily: 'Mooli'}} variant="h2">
                 DAOCare
                </Typography> */}
                
                <div className='presentation'>
                    <Typography sx={{ fontFamily: 'Mooli', marginTop: 0, marginLeft: 13}} variant="h5" align="center" color="black" component="p" width="80%" >
                    🐘 DAOCare stabilizes chaotic upbringing of digital nomad children. This DAO fosters a community anywhere with scheduled playdates and collective discounted lessons and field trips. Trust is accrued with good-behavior tokens that are voted upon successful meetups.                    </Typography>
                    <div className='background-img'></div>
                </div>
                <div className='cards'>
                    <div className='card'>
                        <p>PROPOSALS</p>
                        <Typography sx={{ fontFamily: 'Mooli' }} variant="h6" align="left" color="text.primary" component="p" width="70%">
                            {proposalCount} Total proposals
                        </Typography >
                    </div>
                    <div className='card'>
                        <p>ELIGIBLE VOTERS</p>
                        <Typography sx={{ fontFamily: 'Mooli' }} variant="h6" align="left" color="text.primary" component="p" width="70%">
                            {voters} Total Voters
                        </Typography >
                    </div>
                    <div className='card'>
                        <p>YOUR VOTING POWER</p>
                        <Typography sx={{ fontFamily: 'Mooli' }} variant="h6" align="left" color="text.primary" component="p" width="70%">
                            {userBalance ? userBalance : "0"}
                        </Typography >
                    </div>
                </div>
            </div>
            <div className='dao'>
                <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                    <Typography sx={{ fontFamily: 'Mooli' }} variant="h6" align="center" color="white" component="p"
                    >

                        <div>
                            <Stack spacing={2} direction="row" justifyContent='center'>

                                {/* <Button variant="contained" onClick={() => {
                                    setActiveTab(0);
                                    getValue()
                                }}>Total Assets</Button>
                                <Button variant="contained" onClick={() => {
                                    setActiveTab(1);

                                }}>Get Funds</Button> */}
                                <Button className="rounded" sx={{fontFamily: 'Mooli', borderRadius: '32px', backgroundColor: '#67ABEB'}} variant="contained" onClick={() => {
                                    setActiveTab(2)
                                }}>Propose Activity</Button>
                                <Button className="rounded" sx={{fontFamily: 'Mooli', borderRadius: '32px', backgroundColor: '#67ABEB'}} variant="contained" onClick={() => {
                                    setActiveTab(3)
                                }}>Vote for Activity</Button>
                                <Button className="rounded" sx={{fontFamily: 'Mooli', borderRadius: '32px', backgroundColor: '#67ABEB'}} variant="contained" onClick={() => {
                                    updateParams();
                                    setActiveTab(4)
                                }}>Execute Votes</Button>

                            </Stack>
                            <div style={{color: 'black'}}>
                                {activeTab === 0 && (
                                    <div>
                                        <h2>✨ Less effort, more fun ✨</h2>
                                        {/* <p>The current Value of the Box is: </p>
                                        <h2>{boxValue}</h2> */}


                                    </div>
                                )}
                                {activeTab === 1 && (
                                    <div>
                                        <h2>Get Funds to Participate on the DAO</h2>
                                        <p>Only the owners of the ERC20 Token can Vote</p>

                                        <Button variant='contained' onClick={requestAndUpdateBalance}>Get Funds</Button>
                                    </div>
                                )}
                                {activeTab === 2 && (
                                    <div>
                                        <h2>Propose a new Activity</h2>
                                        <p>The Dao members will vote to decide what happens next</p>

                                        <p> Last proposal: {shortId} </p>

                                        <div className='prop-card'>
                                            <Box
                                                component="form"
                                                sx={{
                                                    '& > :not(style)': { m: 1, width: '25ch' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                            >


                                                <TextField id="outlined-basic" label="Proposal Description" variant="outlined" onChange={handleParamsChange} defaultValue={params.proposalDescription} name='proposalDescription' />
                                                <TextField id="outlined-basic" label="Proposal Value" variant="outlined" onChange={handleParamsChange} defaultValue={params.proposalAmount} name='proposalAmount' />

                                            </Box>
                                        </div>

                                        <Button sx={{fontFamily: 'Mooli', borderRadius: '8px', backgroundColor: '#2BBD6E'}} variant='contained' onClick={() => {

                                            createProposal(signer, params.proposalDescription, params.proposalAmount)
                                            localStorage.setItem('proposalDescription', params.proposalDescription)
                                            localStorage.setItem('proposalAmount', params.proposalAmount)
                                        }}>Create Proposal</Button>

                                    </div>
                                )}
                                {activeTab === 3 && (
                                    <div>
                                        <h2>Choose your preference</h2>
                                        <p>Vote and engage with the DAO</p>
                                        <Box sx={{ minWidth: 275 }}>
                                            <Card variant="outlined"><VoteProposal lastId={proposal} signer={signer} /></Card>
                                        </Box>
                                    </div>
                                )}
                                {activeTab === 4 && (
                                    <div>
                                        <h2>Queue & Execute</h2>
                                        <p>Vote Period has Finished, time to execute!</p>
                                        <Box sx={{ minWidth: 275 }}>
                                            <Card variant="outlined"><ExecuteProposal signer={signer} lastId={proposal} value={propValue} description={propDesc} /></Card>
                                        </Box>
                                    </div>
                                )}

                            </div>
                        </div>

                    </Typography>
                    <Typography sx={{ marginTop: 10 , alignItems: 'center',  }} variant="h6" align="center" color="white" component="p">
                        {/* <div class="row">
                            <div class="column">
                                <img src = {nouns_nft1} alt="nouns_nft1" />
                            </div>
                            <div class="column">
                                <img src = {nouns_nft2} alt="nouns_nft2" />
                            </div>
                            <div class="column">
                                <img src = {nouns_nft3} alt="nouns_nft3" />
                            </div> */}
                            
                        <Stack sx={{justifyContent: 'center'}} direction="row" class="images">
                            <img src = {nouns_nft1} alt="nouns_nft1"/>
                            <img src = {nouns_nft2} alt="nouns_nft2"/>
                            <img src = {nouns_nft3} alt="nouns_nft3"/>
                        </Stack>
                    </Typography>



                </Container>
            </div>


        </>
    )
}





