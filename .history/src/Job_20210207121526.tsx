import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import ReactMarkDown from 'react-markdown'

export default function Job( { job }: any) {
    return (
        <Card>
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {job.title} - <span className="text-muted font-weight-light">
                                {job.company}
                            </span>
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb2">
                            {new Date(job.created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <Badge variant="secondary" className="mr-2"> { job.type }</Badge>
                        <Badge variant="secondary"> { job.location }</Badge>
                    </div>
                    <div style={{ wordBreak: 'break-all'}}>
                        <ReactMarkDown srouce={job.how_to_apply} />
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
