import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';
export default StyleSheet.create({
  container: {
    borderRadius: 4,
    margin: 8,
    backgroundColor: colors.white,
  },

  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 4,
  },

  postActionsContainer: {
    position: 'absolute',
    right: 4,
    top: 4,
  },

  infoContainer: {
    alignItems: 'center',
    justifyContent:'center',
    flexDirection: 'row',
    padding: 8,
},
  innerDetails: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },

  bookRating: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  bookCategory: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  actionsContainer: {
    flexDirection: 'row',
    backgroundColor: '#E7E7E7',
    padding: 8,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  action: {
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    marginLeft: 4,
  },
  propertyName: {
    color: 'black',
    fontWeight: 'bold',
    marginRight: 4,
  },

  bookTitle: {
    color: colors.black,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 8,
  },

  postOwnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },

  postOwnerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  postOwnerNameSurname: {
    color: colors.black,
    fontWeight: 'bold',
  },

  followButtonContainer: {
    backgroundColor: colors.login,
    padding: 8,
    borderRadius: 4,
  },

  followButtonLabel: {
    color: 'white',
  }




});