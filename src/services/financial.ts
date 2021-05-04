import { AxiosResponse } from 'axios'
import { FinancialProps, FilterProps } from '../contexts/financial'
import api from './api'

export const getAll = (filters: FilterProps): Promise<AxiosResponse<any>> => {
    const filter = [`FinancialTypes=${filters.financialType}`]
    filter.push(`PageSize=${filters.PageSize || 20}`)
    filter.push(`PageIndex=${filters.PageIndex || 1}`)
    if (filters.StartDate) filter.push(`StartDate=${filters.StartDate}`)
    if (filters.EndDate) filter.push(`EndDate=${filters.EndDate}`)

    return api.get(`/api/financial?${filter.join('&')}`)
}

export const update = (
    financial: FinancialProps
): Promise<AxiosResponse<any>> => api.put('/api/financial', financial)

export const remove = (uuid: string): Promise<AxiosResponse<any>> =>
    api.delete(`/api/financial/${uuid}`)

export default update
