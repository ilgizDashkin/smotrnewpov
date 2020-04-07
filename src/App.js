import React, { Component } from 'react';
// import bridge from '@vkontakte/vk-bridge';
// import View from '@vkontakte/vkui/dist/components/View/View';
// import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import { View, Panel, PanelHeader, FormLayout, File, Button, Input, Spinner, CardGrid, Card, } from '@vkontakte/vkui';//пакеты из вк
import Icon24CameraOutline from '@vkontakte/icons/dist/24/camera_outline';//это из https://vkcom.github.io/icons/#24/smile
import Icon24Send from '@vkontakte/icons/dist/24/send';
// import Icon24Smile from '@vkontakte/icons/dist/24/smile';
import TableNew from './TableNew'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			result_serv: null,
			start: 0,
			end: 3
		}
	}

	// ждем с сервера данные
	onServer = async () => {
		let response = await fetch('https://ilgiz.h1n.ru/smotrnewpov.php');
		let result = await response.json()

		this.setState({
			isLoading: false,
			result_serv: result,
			start: result['pov_new'].length - 2,
			end: result['pov_new'].length
		})
		console.log(result['pov_new']);
		// localStorage.smotrnewpov = JSON.stringify(this.state);//сохраняем стейт в локалсторадже		
	}
	componentDidMount() {

		this.onServer()
	}
	// //обязательно используем стрелочные фунции чтоб не прописывать методы в конструкторе
	nextView = (event) => {
		if (this.state.result_serv) {
			if (this.state.result_serv['pov_new']) {
				if (this.state.start < this.state.result_serv['pov_new'].length) {
					let end = this.state.end - 1;
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
					let start = this.state.start + 1;
					let end = this.state.end + 1;
					this.setState({ start: start, end: end });
				}
			}
		}
	}


	render() {
		return (
			<View id="view" activePanel="panel">
				<Panel id="panel">
					<PanelHeader>новая база повреждений</PanelHeader>
					<div className="container bg-dark text-center ">
						<div className='container p-2'>
							<a type="button" className="btn btn-danger btn-lg btn-block" href='https://ilgiz.h1n.ru/index.php'>на главную</a>
							<CardGrid>
								<Card size="l" mode="outline">
									{this.state.isLoading ?
										<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
											<Spinner size="large" style={{ marginTop: 20 }} />
										</div> :
										<div>
											<TableNew
												data={this.state.result_serv['pov_new'].slice(this.state.start, this.state.end)}
											/>
											<Button onClick={this.nextView} before={<Icon24Send />} size="l">вперед в прошлое</Button>
											<Button onClick={this.prevView} before={<Icon24Send />} size="l">назад в будущее</Button>
										</div>
									}
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

