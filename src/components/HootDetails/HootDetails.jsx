import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as hootService from '../../services/hootService'
import CommentForm from '../CommentForm/CommentForm'
import { Link } from 'react-router-dom'

const HootDetails = (props) => {

  const { hootId } = useParams()

  const [hoot, setHoot] = useState()
  
  useEffect(() => {
    // fetch a single hoot
    const fetchHoot = async () => {
      // call the hoot service
      const hootData = await hootService.show(hootId)
      setHoot(hootData)
    }
    fetchHoot()
  }, [hootId])

  const handleAddComment = async (formData) => {
    const newComment = await hootService.createComment(formData, hootId)
    console.log(newComment)
    setHoot({...hoot, comments: [...hoot.comments, newComment]})
  }

  if (!hoot) return <main>Loading...</main>

  return (
    <main>
      <header>
        <p>{hoot.category.toUpperCase()}</p>
        <h1>{hoot.title}</h1>
        <p>
          {hoot.author.username} posted on {new Date(hoot.createdAt).toLocaleDateString()}
        </p>
        {/* DELETE BUTTON */}
        {hoot.author._id === props.user._id && (
          <>
            <Link to={`/hoots/${hootId}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteHoot(hootId)}>Delete</button>
          </>
        )}
      </header>
      <h2>Comments</h2>
      <CommentForm handleAddComment={handleAddComment} />
       {!hoot.comments.length && <p>There are no comments.</p>}

        {hoot.comments.map((comment) => (
          <p key={comment._id}>{comment.text}</p>
        ))}
    </main>
  )
}

export default HootDetails