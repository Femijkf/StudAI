import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectQueryById } from '../features/queries/queriesApiSlice'
import { motion } from 'framer-motion'

const truncateText = (text, limit) => {
    if (text.length > limit) {
        return text.substring(0, limit) + "..."; // Truncate text and add ellipsis
    }
    return text;
};

const SingleQuery = ({ queryId, userId, searchQuery }) => {
    const query = useSelector((state) => selectQueryById(state, queryId));
    const navigate = useNavigate();

    if (query) {
        if (searchQuery !== "") {
            if (!query.title.toLowerCase().includes(searchQuery.toLowerCase())
                && !query.lecture_note_input.toLowerCase().includes(searchQuery.toLowerCase())
                && !query.test_output.toLowerCase().includes(searchQuery.toLowerCase())) {
                return null;
            }
        }

        if (toString(userId) !== toString(query.user_id)) return null;

        return (
            <tr>
                <td className="border p-4 font-roboto text-center">{query.title}</td>
                <td className="border p-4 font-roboto">{truncateText(query.lecture_note_input, 100)}</td>
                <td className="border p-4 font-roboto">{truncateText(query.test_output, 100)}</td>
                <td className="border p-4">
                    <motion.button
                        className="w-full text-white bg-gradient-to-b from-yellow-500 via-yellow-300 to-yellow-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        
                    >
                        View
                    </motion.button>
                </td>
            </tr>
        )
    } else return null;
}

export default SingleQuery