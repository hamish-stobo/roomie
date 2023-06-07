import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '..'

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
    const { isAuthed } = useAuth()
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthed ? (
                    <Component {...rest} {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: {
                                from: props.location,
                            },
                        }}
                    />
                )
            }
        />
    )
}

export default ProtectedRoute
