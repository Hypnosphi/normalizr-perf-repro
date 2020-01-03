const { performance } = require('perf_hooks')

const {schema, normalize} = require('normalizr')

const data = require('./data.json')

const getDescription = ({description}) => ({description})

const buildTypeDescription = new schema.Entity(
  'buildTypeDescription',
  {},
  {
    processStrategy: getDescription,
  },
)

const projectWithBuildTypesDescription = new schema.Entity('projects', {
  buildTypes: {buildType: [buildTypeDescription]},
})

const before = performance.now()
const normalized = normalize(data.project, [projectWithBuildTypesDescription])

console.log('Total time: ', performance.now() - before, 'ms')
