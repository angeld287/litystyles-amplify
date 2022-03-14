import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types'

const { Meta } = Card;

const CustomEmployeeCard = ({ key, image, title, onClick }) => {
    return (
        <div style={{ margin: 20 }} >
            <Card
                key={key}
                hoverable
                onClick={onClick}
                style={{ width: 240 }}
                cover={<img src={image} />}
            >
                <Meta title={title} description="Estilista" />
            </Card>
        </div>
    );
}

CustomEmployeeCard.propTypes = {
    key: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
}

CustomEmployeeCard.defaultProps = {
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    title: "Europe Street beat",
}

export default React.memo(CustomEmployeeCard);