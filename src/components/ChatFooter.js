import React from 'react';
import { Consumer } from '../context';

export default class ChatFooter extends React.Component {
	constructor(props) {
		super(props);
		this.input = React.createRef();
		this.handleTextInput = props.handleTextInput;
	}

	handleSubmit = () => {
		let inputValue = this.input.current.value;
		if (inputValue != '') {
			this.handleTextInput(this.input.current.value);
			this.input.current.value = '';
		}
	};

	render() {
		return (
			<Consumer>
				{({ primary_color, bot_name }) => (
					<div className="footer" style={{ borderTop: `1px solid ${primary_color}` }}>
						<form onSubmit={this.handleSubmit} className="chatinputform">
							{/* <p className="replyto">Reply to {bot_name}</p>
							 */}
							<textarea
								className="chatinput"
								placeholder={`Reply to ${bot_name}`}
								//disabled={true}
								ref={this.input}
								onKeyPress={event => {
									if (event.key === 'Enter') {
										this.handleSubmit();
										event.preventDefault();
									}
								}}
							/>
						</form>
					</div>
				)}
			</Consumer>
		);
	}
}
