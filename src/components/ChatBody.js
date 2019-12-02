import React, { useEffect, useRef } from 'react';
import BotMessage from './BotMessage';
import BotOptions from './BotOptions';
import ClientMessage from './ClientMessage';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.scrollToRef = React.createRef();
	}

	scrollToBottom = () => {
		let chatBody = document.getElementsByClassName('chatBody');
		chatBody[0].scrollTo(0, this.scrollToRef.current.offsetTop);
	};

	componentDidUpdate() {
		this.scrollToBottom();
	}

	render() {
		let { data } = this.props.data;
		return (
			<div className="chatBody">
				{data.map((item, index) => {
					let next = data[index + 1] && data[index + 1].author;
					let prev = !index || data[index - 1].author == 1;
					let nextOptions = data[index + 1] && Array.isArray(data[index + 1].message);

					return item.visible !== false ? (
						item.author == 0 ? (
							<div className="botMessageWrapper" style={{ marginBottom: next != 0 ? 18 : 0 }}>
								{Array.isArray(item.message) ? (
									<BotOptions data={{ item, next, prev }} />
								) : (
									<BotMessage
										data={{
											item,
											next,
											prev,
											nextOptions,
										}}
									/>
								)}
							</div>
						) : (
							<ClientMessage data={{ item, next }} />
						)
					) : null;
				})}
				<div ref={this.scrollToRef} />
			</div>
		);
	}
}
