import React, { Component } from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import { View, Panel, PanelHeader, Button, Spinner, CardGrid, Card, Div } from '@vkontakte/vkui';//пакеты из вк
import Icon24Share from '@vkontakte/icons/dist/24/share';//это из https://vkcom.github.io/icons/#24/smile
import Icon24Reply from '@vkontakte/icons/dist/24/reply';
import Icon24Download from '@vkontakte/icons/dist/24/download';
import TableNew from './TableNew'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			result_serv: null,
			start: 0,
			end: 0
		}
	}

	// ждем с сервера данные
	onServer = async () => {
		this.setState({ isLoading: true })
		let response = await fetch('https://ilgiz.h1n.ru/smotrnewpov.php');
		let result = await response.json()
		this.setState({
			isLoading: false,
			result_serv: result,
			start: result['pov_new'].length - 2,
			end: result['pov_new'].length
		})
	}

	componentDidMount() {
		// this.onServer()
		//вызываем предыдущее состояние из локалсториджа
		const lastState = localStorage.smotrnewpov
		if (lastState) {
			// console.log(lastState)
			this.setState(JSON.parse(lastState))
		}
	}

	componentDidUpdate() {
		localStorage.smotrnewpov = JSON.stringify(this.state);//сохраняем стейт в локалсторадже каждый раз когда обновляем компоненты
	  }

	// //обязательно используем стрелочные фунции чтоб не прописывать методы в конструкторе
	nextView = (event) => {
		if (this.state.result_serv) {
			if (this.state.result_serv['pov_new']) {
				if (this.state.start < this.state.result_serv['pov_new'].length) {
					let end = this.state.end - 2;
					let start = end - 2;
					this.setState({ start: start, end: end });						
				}
			}
		}
	}

	prevView = (event) => {
		if (this.state.result_serv) {
			if (this.state.result_serv['pov_new']) {
				if (this.state.end < this.state.result_serv['pov_new'].length) {
					let start = this.state.start + 2;
					let end = this.state.end + 2;
					this.setState({ start: start, end: end });						
				}
			}
		}
	}

	render() {
		return (
			<View id="view" activePanel="panel">
				<Panel id="panel">
					<PanelHeader>новая база повреждений кл</PanelHeader>
					<div className="container bg-dark text-center ">
						<div className='container p-2'>
							<a type="button" className="btn btn-danger btn-lg btn-block" href='https://ilgiz.h1n.ru/index.php'>на главную</a>
							<CardGrid>
								<Card size="l" mode="outline">
									<Div style={{ display: 'flex' }}>
										<Button onClick={this.onServer} stretched before={<Icon24Download />} size="l">загрузить свежие повреждения кл</Button>
									</Div>
									{this.state.result_serv ?
										<div>
											{this.state.isLoading ?
												<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
													<Spinner size="large" style={{ marginTop: 20 }} />
												</div> :
												<div>
													<TableNew
														data={this.state.result_serv['pov_new'].slice(this.state.start, this.state.end)}
													/>
													<Div style={{ display: 'flex' }}>
														<Button onClick={this.prevView} stretched before={<Icon24Reply />} size="l"></Button>
														<Button onClick={this.nextView} stretched before={<Icon24Share />} size="l"></Button>
													</Div>
												</div>
											}
										</div> :
										null}
								</Card>
							</CardGrid>
						</div>
					</div>
				</Panel>
			</View>
		);
	}
}

export default App;

