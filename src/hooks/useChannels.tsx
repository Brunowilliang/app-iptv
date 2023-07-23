import { useQuery } from '@tanstack/react-query'
import { api } from '~/lib/api'
import { IChannel } from '~/types/types'

// Fetch groups
async function getGroups() {
  try {
    const response = await api.get('/groups')
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export function useGroups() {
  return useQuery<string[], Error>({
    queryKey: ['groups'],
    queryFn: getGroups,
  })
}

// Fetch channels of a specific group
async function getChannels(group: string) {
  try {
    const response = await api.get(`/channels/${group}`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export function useChannels(group: string) {
  return useQuery<IChannel[], Error>({
    queryKey: ['channels', group],
    queryFn: () => getChannels(group),
  })
}
