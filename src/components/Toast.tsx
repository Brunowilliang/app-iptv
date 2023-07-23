import { showMessage } from 'react-native-flash-message'

type Props = {
  title: string
  message?: string
  type: 'success' | 'warning' | 'danger' | 'info'
}

export default function Toast(props: Props) {
  const { title, message, type } = props

  showMessage({
    message: title,
    description: message,
    type,
    icon: type,
    floating: true,
    duration: 2000,
    style: {
      zIndex: 9999,
      borderWidth: 0,
      alignItems: 'center',
    },
    titleStyle: {
      color: '#fff',
      fontSize: 13,
      fontFamily: 'MontserratMedium',
      marginBottom: 0,
    },
    textStyle: {
      color: '#fff',
      fontSize: 12,
      fontFamily: 'MontserratMedium',
      marginBottom: 0,
    },
  })
}
