import React from 'react'
import { questItems } from '../../data/questItems';
import { StringUtil } from '../../utils/string.util';

const QuestItems = () => {
    const [found, setFound] = React.useState(undefined as string[] | undefined);
    const [filter, setFilter] = React.useState('');
    const handleFilter = (event: any) => {
        setFilter(event.target.value)
        filterItems(event.target.value)
    }
    const filterItems = (q: string) => {
        if (q.length > 2) {
            const items = questItems.filter(i => i.toLowerCase().includes(q.toLowerCase()));
            console.log({ items, q, questItems })
            setFound(items)
        }
    }
    const s = StringUtil.sanitize;
    const getImg = (item: string) => {
        return `questItems/${s(item)}.gif`
    }
    return (
        <div>
            <h1>Quest Items - Search</h1>
            <input type="text" placeholder="Search" value={filter} onChange={handleFilter} />
            {!!found &&
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            found.map(i => (
                                <tr key={i}>
                                    <td><img width={50} height={50} src={getImg(i)} /></td>
                                    <td>{i}</td>
                                    <td></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}

export default QuestItems
