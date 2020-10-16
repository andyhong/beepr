import { ObjectId } from 'mongodb'
import fetch from 'isomorphic-unfetch'
import { parseISO } from 'date-fns'

import { connectToDatabase } from './db'
import { getTokens, refreshTokens } from './token'

export const getAllCheckins = async (accessToken) => {
  const options = { headers: { "Authorization": `Bearer ${accessToken}` } }
  const fetchServices = await fetch(`https://api.planningcenteronline.com/check-ins/v2/event_times?include=event&order=-starts_at&per_page=100`, options)
  const services = await fetchServices.json()
  const activeServices = services.data
    .filter((service) => {
      return parseISO(service.attributes.starts_at) < Date.now()
        && parseISO(service.attributes.hides_at) > Date.now()
  }).map((service) => {
    return service.id
  })
  const fetchCheckins = await Promise.all(
    activeServices.map(async (service) =>{
      const response = await fetch(`https://api.planningcenteronline.com/check-ins/v2/event_times/${service}/event_period/check_ins`, options)
      const data = await response.json()
      return data.data
    })
  )
  const aggregateCheckins = fetchCheckins.reduce((a, b) => {
    return a.concat(b)
  })
  const allCheckins = aggregateCheckins
    .map((checkin) => {
      return {
        code: checkin.attributes.security_code,
        name: checkin.attributes.emergency_contact_name,
        phone: checkin.attributes.emergency_contact_phone_number
      }
  })

  return allCheckins
}

export const getChurchName = async (userId) => {
  const { db } = await connectToDatabase()
  const account = await db.collection("accounts").findOne({
    userId: ObjectId(userId)
  })
  if (account.churchName) {
    return account.churchName
  } else {
    const options = { headers: { "Authorization": `Bearer ${account.accessToken}` } }
    const fetchOrg = await fetch(`https://api.planningcenteronline.com/people/v2/`, options)
    const org = await fetchOrg.json()
    const churchName = org.data.attributes.name
    await db.collection("accounts").updateOne({
      userId: ObjectId(userId)}, {
        $set: {
          churchName: churchName
        }
      }
    )
    return churchName
  }
}

// export const getPermissions = async (accessToken) => {
//   const options = { headers: { "Authorization": `Bearer ${accessToken}` } }
//   const fetchPermissions = await fetch(`https://api.planningcenteronline.com/check-ins/v2/people`, options)
//   const permission = fetchPermissions.json()
//   return permission.data.attributes.permission
// }

export const getPermission = async (userId) => {
  const { accessToken, pcoId } = await refreshTokens(userId)
  const options = { headers: { "Authorization": `Bearer ${accessToken}` } }
  const fetchPermission = await fetch(`https://api.planningcenteronline.com/check-ins/v2/people/${pcoId}`, options)
  const permission = await fetchPermission.json()
  return permission.data.attributes.permission
}
