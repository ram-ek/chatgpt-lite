const MessageCard = ({ msg }) => {
    return (
        <>
            <div className='prompt-card'>
                <p>{ msg.prompt }</p>
            </div>
            <div className='resp-card'>
                <p>{ msg.resp }</p>
            </div>
        </>
    )
}

export default MessageCard