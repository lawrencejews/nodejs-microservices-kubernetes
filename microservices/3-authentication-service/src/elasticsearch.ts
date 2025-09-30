import { Client } from '@elastic/elasticsearch';
import { config } from '@auth/config';
import { winstonLogger } from '@lawrencejews/marketplace-shared';
import { Logger } from 'winston';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'authenticationElasticSearch', 'debug');

export const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`
});

export async function checkConnection(): Promise<void>{

  let isConnected = false;
  while (!isConnected) {
    try {

      const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
      log.info(`AuthenticationService Elasticsearch health status - ${health.status}`);
      isConnected = true;

    } catch (error) {

      log.error('Connection to elasticsearch failed. Retrying...');
      log.error('error', 'AuthenticationService checkConnection() method', error);
      
    }
  }
}