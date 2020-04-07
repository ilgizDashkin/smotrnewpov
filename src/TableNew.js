import React from 'react';
import { Gallery,Header,Link } from '@vkontakte/vkui';//пакеты из вк

export default props => (
    <div className='container p-2 text-left'>
        {props.data.map(item => (

            <div key={item[0]} className='border'>

                <Header className="bg-warning ">{item[1].replace(/&quot;/gi, '.')}{' '}</Header>
                
                {item[2]}{' '}<br></br>
                {item[3]}{' от '}
                {item[4].replace(/&quot;/gi, '.')}{', '}
                {item[5].replace(/&quot;/gi, '.')}<br></br>
                   вся длина {item[6]}м.{' '}искал {item[8]?item[8]:'неизвестно'}<br></br>
                {item[7] ? <Link href={`https://maps.google.com/?hl=ru&q=${item[7]}`}>координаты места </Link> : null}<br></br>
                

                <Gallery
                slideWidth="90%"
                align="center"
                style={{ height: 320 }}
              >
                {item[9] ? <img src={`https://ilgiz.h1n.ru/${item[9]}`} alt='фото места'></img> : null}
                {item[10] ? <img src={`https://ilgiz.h1n.ru/${item[10]}`} alt='фото места'></img> : null}
                {item[11] ? <img src={`https://ilgiz.h1n.ru/${item[11]}`} alt='фото места'></img> : null}
                <br></br>
              </Gallery>
              {item[9] ? <Link href={`https://ilgiz.h1n.ru/${item[9]}`}>фото места</Link> : null}<br></br>
                {item[10] ? <Link href={`https://ilgiz.h1n.ru/${item[10]}`}>фото места</Link> : null}<br></br>
                {item[11] ? <Link href={`https://ilgiz.h1n.ru/${item[11]}`}>фото места</Link> : null}<br></br>
               
            </div>
        ))}
        
    </div>
)

