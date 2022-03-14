import React from 'react';
import { Card, Avatar } from 'antd';
import PropTypes from 'prop-types'

const { Meta } = Card;

const CustomServiceCard = ({ image, title, onClick, cost }) => {
    return (<Card hoverable onClick={onClick} style={{ width: 300, marginTop: 16 }}>
        <Meta
            avatar={<Avatar src={image} />}
            title={title}
            description={"Este servicio tiene un costo de RD$ " + cost}
        />
    </Card>
    )
}

CustomServiceCard.propTypes = {
    key: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
    cost: PropTypes.string,
}

CustomServiceCard.defaultProps = {
    image: "https://joeschmoe.io/api/v1/random",
    title: "Card title",
    cost: "200",
}

export default React.memo(CustomServiceCard);